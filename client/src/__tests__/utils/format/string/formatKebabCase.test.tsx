import {formatKebabCase} from "../../../../utils/format/string/formatKebabCase.tsx";

describe('Utils', () => {
  describe('Format', () => {
    describe('String', () => {
      it('should convert regular string to kebab-case string', () => {
        const str: string = 'Bug Report';
        expect(formatKebabCase(str)).toEqual('bug-report');
      });
    });
  });
});
