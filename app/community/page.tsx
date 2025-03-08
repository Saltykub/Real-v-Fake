"use client";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusColors = (c: number): string | null => {
  let ret = null;
  if (c >= 0.8) ret = "bg-green-100 text-green-700";
  else if (c >= 0.6) ret = "bg-lime-100 text-lime-700";
  else if (c >= 0.4) ret = "bg-yellow-100 text-yellow-700";
  else if (c >= 0.2) ret = "bg-orange-100 text-orange-700";
  else ret = "bg-red-100 text-red-700";
  return ret;
};

export default function Community() {
  const [reports, setReports] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("reports").select();
      setReports(data);
    };
    getData();
  }, []);

  // const { data: reports } = await supabase.from('reports').select()

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil((reports ? reports.length : 0) / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = reports
    ? reports.slice(indexOfFirstRecord, indexOfLastRecord)
    : null;

  console.log(reports);

  return (
    <div className="w-screen px-4 lg:px-24">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-lg lg:text-2xl font-semibold">Community Reports</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md w-1/3"
        />
      </div>
      <table className="text-xs lg:text-base w-full border-separate border rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left font-sans border-b">
            <th className="rounded-tl-sm p-2 py-4 font-semibold uppercase tracking-wider w-1/3 lg:w-1/2">
              Shop Name
            </th>
            <th className="p-2 font-semibold uppercase tracking-wider w-1/5">
              Platform
            </th>
            <th className="p-2 font-semibold uppercase tracking-wider w-1/5">
              Last Update
            </th>
            <th className="rounded-tr-sm"></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords
            ? currentRecords.map((report, idx) => (
                <tr
                  key={report.id}
                  className={cn("", statusColors(report.confidence))}
                >
                  <td
                    className={cn(
                      "p-2 py-6 font-medium",
                      (idx + 1) % recordsPerPage === 0 ||
                        idx + 1 === report.length
                        ? "rounded-bl-sm"
                        : null,
                    )}
                  >
                    {report.shop ? report.shop : "Unknown"}
                  </td>
                  <td className="p-2">
                    <div className="">
                      {report.platform === "Other" ? (
                        "Other"
                      ) : (
                        <Image
                          alt="platform"
                          height={100}
                          width={150}
                          src={"platforms/" + report.platform + ".svg"}
                        />
                      )}
                    </div>
                  </td>
                  <td className="hidden lg:table-cell p-2 font-medium">
                    {new Date(report.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="lg:hidden p-2 font-medium">
                    {new Date(report.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </td>
                  <td
                    className={cn(
                      "p-2",
                      (idx + 1) % recordsPerPage === 0 ||
                        idx + 1 === report.length
                        ? "rounded-br-sm"
                        : null,
                    )}
                  >
                    <Link
                      className="flex justify-center items-center"
                      href={report.link}
                      target="_blank"
                    >
                      <ExternalLink className="size-4 lg:size-6" />
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className="p-2 border rounded-md disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-gray-100"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <button
            className="p-2 border rounded-md disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-gray-100"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Shop Name</th>
            <th className="border p-2">Platform</th>
            <th className="border p-2">Confidence</th>
            <th className="border p-2">Last Update</th>
            <th className="border p-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((report) => (
            <tr key={report} className="border">
              <td className="border p-2">{report.shop ? report.shop : "Unknown"}</td>
              <td className="border p-2">
                <Image alt="platform" width={150} height={50} src={logos[report.platform]} />
              </td>
              <td className="border p-2">{report.confidence}</td>
              <td className="border p-2">{new Date(report.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</td>
              <td><Link href={report.link} target='_blank'>Link</Link></td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
