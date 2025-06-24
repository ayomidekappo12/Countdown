"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import Image from "next/image";

type WaitlistModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WaitlistModal({
  open,
  onOpenChange,
}: WaitlistModalProps) {
  const shareLink = "https://synaradev.com/ref?=984";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-none p-6 bg-cover bg-no-repeat bg-center text-white min-h-screen max-w-sm md:max-w-lg mx-auto w-[90%] md:w-full opacity-100"
        style={{
          backgroundImage: "url(/images/background.png)",
        }}
      >
        <div className="flex flex-col items-center gap-3 justify-center">
          <div className="flex">
            <Image
              src={"/images/whitelog.png"}
              alt="Logo"
              width={226}
              height={60}
            />
          </div>

          <h2 className="text-base font-semibold text-center">
            Thank You! You&apos;re On The Waitlist.
          </h2>
        </div>

        <hr className="border-gray-700 my-4" />

        <div className="text-center mb-2">
          <div className="border rounded-b-4xl p-3 inline-block text-sm shadow-md text-pretty">
            You&apos;re <br />
            <span className="text-purple-400 font-semibold">#1,284</span> On <br /> The
            List
          </div>
          <p className="text-xs mt-2 text-gray-400">
            A Total Of <span className="font-medium">1,284 Founders</span> Have
            Joined SynaraDev&apos;s Waitlist So Far
          </p>
        </div>

        <hr className="border-gray-700 my-4" />

        <p className="text-center text-sm mb-2">
          Refer A Friend To Be Part Of Us As Well
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <Input
            value={shareLink}
            readOnly
            className="text-xs bg-[#1E1033] border border-gray-700"
          />
          <Button size="sm" variant="secondary" onClick={copyToClipboard}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <Button
            size="sm"
            variant="outline"
            className="w-full bg-[#1DA1F2] text-white"
          >
            Share On X
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full bg-[#0077B5] text-white"
          >
            Share On LinkedIn
          </Button>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          Join the waitlist
        </Button>
      </DialogContent>
    </Dialog>
  );
}
