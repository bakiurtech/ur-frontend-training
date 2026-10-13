import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full h-svh p-2.5">
      <div className="relative w-full h-full">
        <Image
          src="/404.png"
          alt="page not found"
          fill
          quality={95}
          className="rounded-[50px] object-cover object-bottom-right"
        />
      </div>
    </div>
  );
}