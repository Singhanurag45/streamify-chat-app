import { create } from "zustand";

export const useThemeStore = create((set) => {
  // Delay reading localStorage until it's safe
  const savedTheme =
    typeof window !== "undefined"
      ? localStorage.getItem("streamify-theme")
      : null;

  return {
    theme: savedTheme || "coffee",
    setTheme: (theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("streamify-theme", theme);
      }
      set({ theme });
    },
  };
});
