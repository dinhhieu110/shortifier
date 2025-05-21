import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const HowItWork = () => {
  return (
    <Accordion type="multiple" className="w-full md:px-11 mt-24">
      <AccordionItem value="step-1">
        <AccordionTrigger>Step 1: Enter Your Long URL</AccordionTrigger>
        <AccordionContent>
          Paste the full, original URL you want to shorten into the input field
          on the homepage.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-2">
        <AccordionTrigger>Step 2: Click the "Shorten" Button</AccordionTrigger>
        <AccordionContent>
          After pasting the URL, click the "Shorten" button. Our system will
          generate a unique, shortened version of your link.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-3">
        <AccordionTrigger>
          Step 3: Copy and Share the Short Link
        </AccordionTrigger>
        <AccordionContent>
          The newly created short link will appear below the input. Click to
          copy it and share it wherever you like — in emails, social media, or
          messages.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-4">
        <AccordionTrigger>Step 4: Track (Optional)</AccordionTrigger>
        <AccordionContent>
          If your app supports it, you can track how many people clicked your
          short link through analytics features.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowItWork;
