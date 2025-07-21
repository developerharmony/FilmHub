export const themes = {
  light: {
    name: "Açık Tema",
    colors: {
      bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
      cardBg: "bg-white/80 backdrop-blur-sm",
      text: "text-gray-900",
      primary: "bg-gradient-to-r from-indigo-600 to-violet-600",
      secondary: "bg-gradient-to-r from-blue-600 to-indigo-600",
      accent: "text-indigo-600",
    },
  },
  dark: {
    name: "Koyu Tema",
    colors: {
      bg: "bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900",
      cardBg: "bg-gray-800/80 backdrop-blur-sm",
      text: "text-gray-100",
      primary: "bg-gradient-to-r from-indigo-500 to-purple-500",
      secondary: "bg-gradient-to-r from-blue-500 to-indigo-500",
      accent: "text-indigo-400",
    },
  },
  custom: {
    name: "Özel Tema",
    colors: {
      bg: "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900 via-indigo-900 to-blue-900",
      cardBg: "bg-white/10 backdrop-blur-lg",
      text: "text-white",
      primary: "bg-gradient-to-r from-pink-500 to-violet-500",
      secondary: "bg-gradient-to-r from-cyan-500 to-blue-500",
      accent: "text-pink-400",
    },
  },
};