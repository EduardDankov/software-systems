import {toLocalISOString} from "../../../../utils/format/date/toLocalISOString.tsx";

describe('Utils', () => {
  describe('Format', () => {
    describe('Date', () => {
      it('should convert ISO String to Local ISO String', () => {
        const isoString: string = '2023-12-01T00:00:00.00Z';
        expect(toLocalISOString(new Date(isoString))).toEqual('2023-12-01T02:00:00.00-02:00');
      });
    });
  });
});
