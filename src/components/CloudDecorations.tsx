"use client";

export function DriftingClouds() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Row 1 — slow drift right, top area */}
      <svg
        className="animate-cloud-drift absolute -left-48 top-[8%] h-28 w-auto opacity-[0.10]"
        style={{ animationDuration: "50s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#5DADEC" />
      </svg>

      {/* Row 2 — drift left, mid area */}
      <svg
        className="animate-cloud-drift-reverse absolute -right-48 top-[35%] h-20 w-auto opacity-[0.08]"
        style={{ animationDuration: "65s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#7EE8C6" />
      </svg>

      {/* Row 3 — slow drift right, lower */}
      <svg
        className="animate-cloud-drift absolute -left-64 top-[60%] h-16 w-auto opacity-[0.07]"
        style={{ animationDuration: "80s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#FFB347" />
      </svg>

      {/* Row 4 — drift left, bottom */}
      <svg
        className="animate-cloud-drift-reverse absolute -right-32 top-[82%] h-24 w-auto opacity-[0.09]"
        style={{ animationDuration: "58s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#5DADEC" />
      </svg>

      {/* Extra small cloud — fast */}
      <svg
        className="animate-cloud-drift absolute -left-24 top-[20%] h-10 w-auto opacity-[0.06]"
        style={{ animationDuration: "35s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#7EE8C6" />
      </svg>

      {/* Extra small cloud — slow reverse */}
      <svg
        className="animate-cloud-drift-reverse absolute -right-20 top-[48%] h-12 w-auto opacity-[0.06]"
        style={{ animationDuration: "90s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#FFB347" />
      </svg>
    </div>
  );
}

export function HeroClouds() {
  return (
    <>
      {/* Large top-right cloud — bobbing */}
      <svg
        className="animate-cloud-bob absolute -top-6 right-4 h-24 w-auto opacity-[0.14] sm:right-12 sm:h-36"
        style={{ animationDelay: "0s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#5DADEC" />
      </svg>

      {/* Medium left cloud — bobbing delayed */}
      <svg
        className="animate-cloud-bob absolute top-48 -left-8 h-16 w-auto opacity-[0.12] sm:top-40 sm:-left-4 sm:h-24"
        style={{ animationDelay: "-2s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#7EE8C6" />
      </svg>

      {/* Small bottom cloud — bobbing */}
      <svg
        className="animate-cloud-bob absolute bottom-8 right-1/4 h-14 w-auto opacity-[0.10] sm:bottom-16 sm:h-20"
        style={{ animationDelay: "-1s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#FFB347" />
      </svg>

      {/* Tiny accent cloud */}
      <svg
        className="animate-float absolute top-1/3 right-8 h-8 w-auto opacity-[0.10] sm:right-20 sm:h-12"
        style={{ animationDelay: "-3s" }}
        viewBox="0 0 160 80"
        fill="none"
      >
        <path d="M140 55c0 13.8-11.2 25-25 25H45c-16.6 0-30-13.4-30-30 0-14.3 10-26.3 23.3-29.3C42.7 8.3 57 0 74 0c22.1 0 40.8 14.7 46.8 34.8C129.4 31.5 140 41.8 140 55z" fill="#5DADEC" />
      </svg>
    </>
  );
}

export function SectionCloudDivider() {
  return (
    <div className="relative -my-1 h-20 overflow-hidden">
      {/* Left cloud */}
      <svg className="absolute -left-6 top-0 h-full w-auto opacity-[0.10]" viewBox="0 0 320 64" fill="none">
        <path d="M0 32c0 17.7 14.3 32 32 32h224c22.1 0 40-17.9 40-40S278.1-16 256-16c-14 0-26 7.2-32.8 18.2C213.5-10.5 197.6-16 180-16c-28 0-51.2 20.5-55.5 47.3C115.5 16.5 103 12 90 12 66.8 12 48 30.8 48 54V48c0-10-8-16-16-16H0v0z" fill="#5DADEC" />
      </svg>
      {/* Right cloud */}
      <svg className="absolute -right-6 top-4 h-3/4 w-auto opacity-[0.08]" viewBox="0 0 240 56" fill="none">
        <path d="M240 38c0 10-8 18-18 18H64c-15 0-27-12-27-27 0-12.6 9-23 20.5-25.7C65.6 0 78-6 93-6c19.3 0 35.6 12.8 40.8 30.4C141.5 20 154.8 15 170 15c19.8 0 36 12.4 42 30z" fill="#7EE8C6" />
      </svg>
    </div>
  );
}
