import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const HowItWork = () => {
  return (
    <Accordion type="multiple" className="w-full md:px-11">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does the Shortifier works!</AccordionTrigger>
        <AccordionContent>
          When you enter a long URL, our system generates a shorter version of
          that URL. This shortened URL redirects to the original long URL when
          accessed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does the Shortifier works!</AccordionTrigger>
        <AccordionContent>
          When you enter a long URL, our system generates a shorter version of
          that URL. This shortened URL redirects to the original long URL when
          accessed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does the Shortifier works!</AccordionTrigger>
        <AccordionContent>
          When you enter a long URL, our system generates a shorter version of
          that URL. This shortened URL redirects to the original long URL when
          accessed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowItWork;
