  import StatsComponent from "@/components/StatsComponent";
  import { columns } from "@/components/table/Columns";
  import { DataTable } from "@/components/table/DataTable";
  import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
  import Image from "next/image";
  import Link from "next/link";

  const AdminPage = async () => {
    const appointments = await getRecentAppointmentList();
    return (

      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header mt-10">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="Logo"
              height={32}
              width={162}
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>
        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Start the day with managing new appointments</p>
          </section>
          <section className="admin-stat">
            <StatsComponent
              type="appointment"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon="/assets/icons/appointments.svg"
            />
            <StatsComponent
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon="/assets/icons/pending.svg"
            />
            <StatsComponent
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon="/assets/icons/cancelled.svg"
            />
          </section>

          <DataTable data={appointments.documents} columns={columns} />
        </main>
      </div>
    );
  };

  export default AdminPage;
