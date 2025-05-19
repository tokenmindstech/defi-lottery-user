import OpenTicketForm from "./_components/open-ticket-form";
import { SupportTicketTable } from "./_components/support-ticket-list";

const SupportPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Support
        </h2>
        <OpenTicketForm />
      </div>

      <SupportTicketTable />
    </section>
  );
};

export default SupportPage;
