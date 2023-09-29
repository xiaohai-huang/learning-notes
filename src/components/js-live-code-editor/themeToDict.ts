import { Language, PrismTheme } from "prism-react-renderer";

type ThemeDict = {
  root: object;
  plain: object;
  [type: string]: object;
};

const themeToDict = (theme: PrismTheme, language: Language): ThemeDict => {
  const { plain } = theme;
  const themeDict = theme.styles.reduce<ThemeDict>((acc, themeEntry) => {
    const { languages, style } = themeEntry;

    if (languages && !languages.includes(language)) {
      return acc;
    }

    themeEntry.types.forEach((type) => {
      const accStyle = { ...acc[type], ...style };
      acc[type] = accStyle;
    });
    return acc;
  }, {} as ThemeDict);

  themeDict.root = plain;
  themeDict.plain = { ...plain, backgroundColor: undefined };
  return themeDict;
};

export default themeToDict;
