import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to delete this url");
  }
  return data;
}

export async function createUrl(
  { title, original_url, custom_url, user_id },
  qrCode
) {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${shortUrl}`;
  const { error: storageErr } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrCode);
  if (storageErr) throw new Error(storageErr.message);
  const uploadedQR = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url,
        custom_url: custom_url || null,
        user_id,
        short_url: shortUrl,
        qr: uploadedQR,
      },
    ])
    .select();
  if (error) {
    console.log(error.message);
    throw new Error("Unable to create new url");
  }
  return data;
}
