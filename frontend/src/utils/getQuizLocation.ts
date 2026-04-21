async function getLocationFromLatLng(latitude: number, longitude: number) {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": "Cognify/1.0 (daverapu47@yahoo.com)", // required
        },
      },
    );

    if (!resp.ok) throw new Error(`Nominatim fetch failed: ${resp.status}`);

    const data = await resp.json();

    const city =
      data.address.city || data.address.town || data.address.village || null;
    const country = data.address.country || null;

    return { city, country };
  } catch (err) {
    console.error("Error fetching location:", err);
    return { city: null, country: null }; // fail gracefully
  }
}
async function getLocationFromIP(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    // console.log("ip-api response:", data);

    if (data.status === "fail") {
    //   console.warn("ip-api failed for IP:", ip, "Reason:", data.message);
      return { country: null, city: null };
    }

    return {
      country: data.country ?? null,
      city: data.city ?? null,
    };
  } catch (error) {
    console.error("getLocationFromIP error:", error);
    return { country: null, city: null };
  }
}
const getUserIP = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip; // real public IP, no CGNAT issues
};

type QuizLocation = {
  city: string | null;
  country: string | null;
  precise: boolean;
};

// When the MMSE quiz starts, prompt navigator
export const getQuizLocation = async () => {
  return new Promise<QuizLocation>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Got precise location, reverse geocode it
        const location = await getLocationFromLatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        resolve({ ...location, precise: true });
      },
      async () => {
        // Denied — fall back to IP
        const ip = await getUserIP();
        const location = await getLocationFromIP(ip);
        resolve({ ...location, precise: false });
      },
    );
  });
};
