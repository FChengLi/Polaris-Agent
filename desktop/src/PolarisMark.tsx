const logoUrl = `${import.meta.env.BASE_URL}brand/polaris-north-star.png`

/** Generated product artwork; action icons continue to use Lucide. */
export default function PolarisMark({ size = 24 }: { size?: number }) {
  return <img src={logoUrl} alt="" aria-hidden="true" className="polaris-mark" width={size} height={size}/>
}
