import logoImg from "../../assets/khicon_border.png";

export default function Header() {
    return (
        <div className="flex items-center gap-3">
            <img className="w-14" src={logoImg} alt="logo kauehenrick" />
            <p className="font-medium text-lg">Máscaras de input CNPJ/CPF <br /> shadcn/ui</p>
        </div>
    )
}