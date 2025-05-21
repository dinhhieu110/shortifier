import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import type { IUrl } from "@/types";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/apiUrl";
import { BeatLoader } from "react-spinners";
const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef({});
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const initForm = {
    title: "",
    original_url: longLink || "",
    custom_url: "",
  };
  const [errors, setErrors] = useState<IUrl>({});
  const [form, setForm] = useState<IUrl>(initForm);
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    original_url: Yup.string()
      .url("Must be a valid URL")
      .required("Original URL is required"),
    custom_url: Yup.string(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...form, user_id: user.id });

  useEffect(() => {
    if (!error && data) navigate(`/link/${data[0].id}`);
  }, [error, data]);

  const createNewUrl = async () => {
    setErrors({});
    try {
      await schema.validate(form, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      //   This is arguments in useFetch
      await fnCreateUrl(blob);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const newErrors: Partial<Record<keyof IUrl, string>> = {};
        e.inner.forEach((err) => {
          if (err.path && err.message) {
            newErrors[err.path as keyof IUrl] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Unexpected error during validation:", e);
      }
    }
  };

  return (
    <Dialog
      defaultOpen={!!longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button className="h-full bg-[#0186da] hover:bg-[#0186da] cursor-pointer">
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#555] font-bold text-2xl">
            Create New
          </DialogTitle>
        </DialogHeader>
        {form.original_url && (
          <QRCode value={form.original_url} size={250} ref={ref} />
        )}
        <Input
          id="title"
          placeholder="Short Link's Title"
          value={form.title}
          onChange={handleInputChange}
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="original_url"
          placeholder="Enter your long URL"
          value={form.original_url}
          onChange={handleInputChange}
        />
        {errors.original_url && <Error message={errors.original_url} />}
        <div className="flex items-center gap-2">
          <Card className="p-1 rounded-sm">trimrr.in</Card> /
          <Input
            id="custom_url"
            placeholder="Custom Link (optional)"
            value={form.custom_url}
            onChange={handleInputChange}
          />
        </div>
        {errors.custom_url && <Error message={errors.custom_url} />}
        <DialogFooter>
          <Button
            disabled={loading}
            className="h-full bg-[#0186da] hover:bg-[#0186da] cursor-pointer"
            type="submit"
            onClick={createNewUrl}
          >
            {loading ? <BeatLoader size={10} color="black" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
