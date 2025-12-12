import { MdDocumentScanner } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="mx-auto grid max-w-6xl min-w-lg grid-cols-3 items-center justify-between gap-5 rounded-2xl bg-neutral-700 px-3 py-3">
      <div className="col-span-2 flex items-center justify-start hover:text-white">
        <MdDocumentScanner
          fontSize={25}
          color="var(--color-neutral-300)"
          className="hover:text-white"
        />
      </div>
      <div className="col-span-1 flex items-center justify-around">
        <div className="cursor-pointer text-lg text-neutral-300 hover:text-white">
          Home
        </div>
        <div className="cursor-pointer text-lg text-neutral-300 hover:text-white">
          features
        </div>{" "}
        <div className="cursor-pointer text-lg text-yellow-300 hover:text-white">
          Docs
        </div>
      </div>
    </div>
  );
};

export default Navbar;
