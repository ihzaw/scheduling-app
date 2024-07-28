import Link from "next/link";
import Button from "./Button";

interface NavbarProps {
  titleLabel?: string,
  btnLabel: string, 
  onClickBtn: () => void,
} 

const Navbar = (props: NavbarProps) => {
  const { titleLabel, btnLabel, onClickBtn } = props

  return (
    <div className="navbar p-0">
      <div className="flex-1">
        <Link href={'/'} className="text-4xl p-0 font-semibold">{titleLabel}</Link>
      </div>
      <div className="flex-1 justify-end">
        <Button className="btn btn-outline justify-start" onClick={onClickBtn}>
          {btnLabel}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
