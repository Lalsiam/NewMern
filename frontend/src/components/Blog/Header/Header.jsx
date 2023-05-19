import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">*Thoughts and memories*</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://images.shiksha.com/mediadata/images/1559273318phpkS54ZX.jpeg"
        alt=""
      />
    </div>
  );
}
