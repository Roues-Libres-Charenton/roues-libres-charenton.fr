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

    const hash = href.split("#")[1];
    const [undefined, lat, lng] = hash.split("/");

    if (isAndroid) {
      href = `geo:${lat},${lng}?q=Roues Libres Charenton`;
    } else if (isIos) {
      href = `http://maps.apple.com/?ll=${lat},${lng}&address=84 Quai des Carrières&q=Roues Libres Charenton`;
    }

    link.setAttribute("href", href);
  });
}
