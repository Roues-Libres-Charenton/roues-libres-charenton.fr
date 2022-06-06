const ua = navigator.userAgent.toLowerCase();

const isAndroid = ua.indexOf("android") > -1;
const isIos =
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (ua.includes("Mac") && "ontouchend" in document);

if (isAndroid || isIos) {
  const links = document.querySelectorAll(
    '[href^="https://www.openstreetmap.org/"]'
  );

  links.forEach((link) => {
    let href = link.getAttribute("href");
    let title = link.getAttribute("title") || "";
    let address = link.getAttribute("data-address") || "";

    const hash = href.split("#")[1];
    const [undefined, lat, lng] = hash.split("/");

    if (isAndroid) {
      const q =
        title && address ? `${title}, ${address}` : title || address || "";
      href = `geo:${lat},${lng}?q=${q}`;
    } else if (isIos) {
      href = `http://maps.apple.com/?ll=${lat},${lng}&address=${address}&q=${title}`;
    }

    link.setAttribute("href", href);
  });
}
