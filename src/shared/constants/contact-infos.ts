export const CONTACT_INFOS = {
  phone: {
    label: "+998 93 098 14 09",
    value: "+998930981409",
    href: "tel:+998930981409",
  },
  email: {
    label: "muxsincoder@gmail.com",
    value: "muxsincoder@gmail.com",
    href: "mailto:muxsincoder@gmail.com",
  },
  address: {
    label: "Toshkent, O‘zbekiston",
    value: "Toshkent, O‘zbekiston",
    href: "https://maps.google.com/?q=Tashkent+Uzbekistan",
  },
  website: {
    label: "muxsinjon.uz",
    value: "muxsinjon.uz",
    href: "https://muxsinjon.uz",
  },
  telegram: {
    label: "@muxsinjohn",
    value: "muxsinjohn",
    href: "https://t.me/muxsinjohn",
  },
  github: {
    label: "github.com/muxsin",
    value: "muxsin",
    href: "https://github.com/muxsin",
  },
  linkedin: {
    label: "linkedin.com/in/muxsinjon",
    value: "muxsinjon",
    href: "https://linkedin.com/in/muxsinjon",
  },
  twitter: {
    label: "@mxsnjon",
    value: "mxsnjon",
    href: "https://x.com/mxsnjon",
  },
  facebook: {
    label: "facebook.com/mxsnjon",
    value: "mxsnjon",
    href: "https://facebook.com/mxsnjon",
  },
  substack: {
    label: "muxsinjon.substack.com",
    value: "muxsinjon",
    href: "https://muxsinjon.substack.com",
  },
} as const;

export const DEVELOPER_CONTACT_INFOS = {
  name: "Muxsinjon Maxsudovich",
  role: "Software Engineer",
  website: {
    label: "muxsinjon.uz",
    value: "muxsinjon.uz",
    href: "https://muxsinjon.uz",
  },
  email: {
    label: "muxsincoder@gmail.com",
    value: "muxsincoder@gmail.com",
    href: "mailto:muxsincoder@gmail.com",
  },
  phone: {
    label: "+998 93 098 14 09",
    value: "+998930981409",
    href: "tel:+998930981409",
  },
  github: {
    label: "github.com/muxsin",
    value: "muxsin",
    href: "https://github.com/muxsin",
  },
  linkedin: {
    label: "linkedin.com/in/muxsinjon",
    value: "muxsinjon",
    href: "https://linkedin.com/in/muxsinjon",
  },
  telegram: {
    label: "@muxsinjohn",
    value: "muxsinjohn",
    href: "https://t.me/muxsinjohn",
  },
  facebook: {
    label: "facebook.com/mxsnjon",
    value: "mxsnjon",
    href: "https://facebook.com/mxsnjon",
  },
  twitter: {
    label: "@mxsnjon",
    value: "mxsnjon",
    href: "https://x.com/mxsnjon",
  },
  substack: {
    label: "muxsinjon.substack.com",
    value: "muxsinjon",
    href: "https://muxsinjon.substack.com",
  },
} as const;

export type ContactKey = keyof typeof CONTACT_INFOS;
export type DeveloperContactKey = keyof typeof DEVELOPER_CONTACT_INFOS;
