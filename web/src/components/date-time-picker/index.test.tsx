import { render } from '@testing-library/react';

import { DateTimePicker } from '.';

describe('DateTimePicker', () => {
  it('render', async () => {
    const result = render(<DateTimePicker />);

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="rdrCalendarWrapper"
        >
          <div
            class="rdrDateDisplayWrapper"
          />
          <div
            class="rdrMonthAndYearWrapper"
          >
            <button
              class="rdrNextPrevButton rdrPprevButton"
              type="button"
            >
              <i />
            </button>
            <span
              class="rdrMonthAndYearPickers"
            >
              <span
                class="rdrMonthPicker"
              >
                <select>
                  <option
                    value="0"
                  >
                    enero
                  </option>
                  <option
                    value="1"
                  >
                    febrero
                  </option>
                  <option
                    value="2"
                  >
                    marzo
                  </option>
                  <option
                    value="3"
                  >
                    abril
                  </option>
                  <option
                    value="4"
                  >
                    mayo
                  </option>
                  <option
                    value="5"
                  >
                    junio
                  </option>
                  <option
                    value="6"
                  >
                    julio
                  </option>
                  <option
                    value="7"
                  >
                    agosto
                  </option>
                  <option
                    value="8"
                  >
                    septiembre
                  </option>
                  <option
                    value="9"
                  >
                    octubre
                  </option>
                  <option
                    value="10"
                  >
                    noviembre
                  </option>
                  <option
                    value="11"
                  >
                    diciembre
                  </option>
                </select>
              </span>
              <span />
              <span
                class="rdrYearPicker"
              >
                <select>
                  <option
                    value="2044"
                  >
                    2044
                  </option>
                  <option
                    value="2043"
                  >
                    2043
                  </option>
                  <option
                    value="2042"
                  >
                    2042
                  </option>
                  <option
                    value="2041"
                  >
                    2041
                  </option>
                  <option
                    value="2040"
                  >
                    2040
                  </option>
                  <option
                    value="2039"
                  >
                    2039
                  </option>
                  <option
                    value="2038"
                  >
                    2038
                  </option>
                  <option
                    value="2037"
                  >
                    2037
                  </option>
                  <option
                    value="2036"
                  >
                    2036
                  </option>
                  <option
                    value="2035"
                  >
                    2035
                  </option>
                  <option
                    value="2034"
                  >
                    2034
                  </option>
                  <option
                    value="2033"
                  >
                    2033
                  </option>
                  <option
                    value="2032"
                  >
                    2032
                  </option>
                  <option
                    value="2031"
                  >
                    2031
                  </option>
                  <option
                    value="2030"
                  >
                    2030
                  </option>
                  <option
                    value="2029"
                  >
                    2029
                  </option>
                  <option
                    value="2028"
                  >
                    2028
                  </option>
                  <option
                    value="2027"
                  >
                    2027
                  </option>
                  <option
                    value="2026"
                  >
                    2026
                  </option>
                  <option
                    value="2025"
                  >
                    2025
                  </option>
                  <option
                    value="2024"
                  >
                    2024
                  </option>
                  <option
                    value="2023"
                  >
                    2023
                  </option>
                  <option
                    value="2022"
                  >
                    2022
                  </option>
                  <option
                    value="2021"
                  >
                    2021
                  </option>
                  <option
                    value="2020"
                  >
                    2020
                  </option>
                  <option
                    value="2019"
                  >
                    2019
                  </option>
                  <option
                    value="2018"
                  >
                    2018
                  </option>
                  <option
                    value="2017"
                  >
                    2017
                  </option>
                  <option
                    value="2016"
                  >
                    2016
                  </option>
                  <option
                    value="2015"
                  >
                    2015
                  </option>
                  <option
                    value="2014"
                  >
                    2014
                  </option>
                  <option
                    value="2013"
                  >
                    2013
                  </option>
                  <option
                    value="2012"
                  >
                    2012
                  </option>
                  <option
                    value="2011"
                  >
                    2011
                  </option>
                  <option
                    value="2010"
                  >
                    2010
                  </option>
                  <option
                    value="2009"
                  >
                    2009
                  </option>
                  <option
                    value="2008"
                  >
                    2008
                  </option>
                  <option
                    value="2007"
                  >
                    2007
                  </option>
                  <option
                    value="2006"
                  >
                    2006
                  </option>
                  <option
                    value="2005"
                  >
                    2005
                  </option>
                  <option
                    value="2004"
                  >
                    2004
                  </option>
                  <option
                    value="2003"
                  >
                    2003
                  </option>
                  <option
                    value="2002"
                  >
                    2002
                  </option>
                  <option
                    value="2001"
                  >
                    2001
                  </option>
                  <option
                    value="2000"
                  >
                    2000
                  </option>
                  <option
                    value="1999"
                  >
                    1999
                  </option>
                  <option
                    value="1998"
                  >
                    1998
                  </option>
                  <option
                    value="1997"
                  >
                    1997
                  </option>
                  <option
                    value="1996"
                  >
                    1996
                  </option>
                  <option
                    value="1995"
                  >
                    1995
                  </option>
                  <option
                    value="1994"
                  >
                    1994
                  </option>
                  <option
                    value="1993"
                  >
                    1993
                  </option>
                  <option
                    value="1992"
                  >
                    1992
                  </option>
                  <option
                    value="1991"
                  >
                    1991
                  </option>
                  <option
                    value="1990"
                  >
                    1990
                  </option>
                  <option
                    value="1989"
                  >
                    1989
                  </option>
                  <option
                    value="1988"
                  >
                    1988
                  </option>
                  <option
                    value="1987"
                  >
                    1987
                  </option>
                  <option
                    value="1986"
                  >
                    1986
                  </option>
                  <option
                    value="1985"
                  >
                    1985
                  </option>
                  <option
                    value="1984"
                  >
                    1984
                  </option>
                  <option
                    value="1983"
                  >
                    1983
                  </option>
                  <option
                    value="1982"
                  >
                    1982
                  </option>
                  <option
                    value="1981"
                  >
                    1981
                  </option>
                  <option
                    value="1980"
                  >
                    1980
                  </option>
                  <option
                    value="1979"
                  >
                    1979
                  </option>
                  <option
                    value="1978"
                  >
                    1978
                  </option>
                  <option
                    value="1977"
                  >
                    1977
                  </option>
                  <option
                    value="1976"
                  >
                    1976
                  </option>
                  <option
                    value="1975"
                  >
                    1975
                  </option>
                  <option
                    value="1974"
                  >
                    1974
                  </option>
                  <option
                    value="1973"
                  >
                    1973
                  </option>
                  <option
                    value="1972"
                  >
                    1972
                  </option>
                  <option
                    value="1971"
                  >
                    1971
                  </option>
                  <option
                    value="1970"
                  >
                    1970
                  </option>
                  <option
                    value="1969"
                  >
                    1969
                  </option>
                  <option
                    value="1968"
                  >
                    1968
                  </option>
                  <option
                    value="1967"
                  >
                    1967
                  </option>
                  <option
                    value="1966"
                  >
                    1966
                  </option>
                  <option
                    value="1965"
                  >
                    1965
                  </option>
                  <option
                    value="1964"
                  >
                    1964
                  </option>
                  <option
                    value="1963"
                  >
                    1963
                  </option>
                  <option
                    value="1962"
                  >
                    1962
                  </option>
                  <option
                    value="1961"
                  >
                    1961
                  </option>
                  <option
                    value="1960"
                  >
                    1960
                  </option>
                  <option
                    value="1959"
                  >
                    1959
                  </option>
                  <option
                    value="1958"
                  >
                    1958
                  </option>
                  <option
                    value="1957"
                  >
                    1957
                  </option>
                  <option
                    value="1956"
                  >
                    1956
                  </option>
                  <option
                    value="1955"
                  >
                    1955
                  </option>
                  <option
                    value="1954"
                  >
                    1954
                  </option>
                  <option
                    value="1953"
                  >
                    1953
                  </option>
                  <option
                    value="1952"
                  >
                    1952
                  </option>
                  <option
                    value="1951"
                  >
                    1951
                  </option>
                  <option
                    value="1950"
                  >
                    1950
                  </option>
                  <option
                    value="1949"
                  >
                    1949
                  </option>
                  <option
                    value="1948"
                  >
                    1948
                  </option>
                  <option
                    value="1947"
                  >
                    1947
                  </option>
                  <option
                    value="1946"
                  >
                    1946
                  </option>
                  <option
                    value="1945"
                  >
                    1945
                  </option>
                  <option
                    value="1944"
                  >
                    1944
                  </option>
                  <option
                    value="1943"
                  >
                    1943
                  </option>
                  <option
                    value="1942"
                  >
                    1942
                  </option>
                  <option
                    value="1941"
                  >
                    1941
                  </option>
                  <option
                    value="1940"
                  >
                    1940
                  </option>
                  <option
                    value="1939"
                  >
                    1939
                  </option>
                  <option
                    value="1938"
                  >
                    1938
                  </option>
                  <option
                    value="1937"
                  >
                    1937
                  </option>
                  <option
                    value="1936"
                  >
                    1936
                  </option>
                  <option
                    value="1935"
                  >
                    1935
                  </option>
                  <option
                    value="1934"
                  >
                    1934
                  </option>
                  <option
                    value="1933"
                  >
                    1933
                  </option>
                  <option
                    value="1932"
                  >
                    1932
                  </option>
                  <option
                    value="1931"
                  >
                    1931
                  </option>
                  <option
                    value="1930"
                  >
                    1930
                  </option>
                  <option
                    value="1929"
                  >
                    1929
                  </option>
                  <option
                    value="1928"
                  >
                    1928
                  </option>
                  <option
                    value="1927"
                  >
                    1927
                  </option>
                  <option
                    value="1926"
                  >
                    1926
                  </option>
                  <option
                    value="1925"
                  >
                    1925
                  </option>
                  <option
                    value="1924"
                  >
                    1924
                  </option>
                </select>
              </span>
            </span>
            <button
              class="rdrNextPrevButton rdrNextButton"
              type="button"
            >
              <i />
            </button>
          </div>
          <div
            class="rdrMonths rdrMonthsVertical"
          >
            <div
              class="rdrMonth"
            >
              <div
                class="rdrWeekDays"
              >
                <span
                  class="rdrWeekDay"
                >
                  lun
                </span>
                <span
                  class="rdrWeekDay"
                >
                  mar
                </span>
                <span
                  class="rdrWeekDay"
                >
                  mié
                </span>
                <span
                  class="rdrWeekDay"
                >
                  jue
                </span>
                <span
                  class="rdrWeekDay"
                >
                  vie
                </span>
                <span
                  class="rdrWeekDay"
                >
                  sáb
                </span>
                <span
                  class="rdrWeekDay"
                >
                  dom
                </span>
              </div>
              <div
                class="rdrDays"
              >
                <button
                  class="rdrDay rdrDayStartOfWeek rdrDayStartOfMonth"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      1
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      2
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      3
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      4
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayToday"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      5
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      6
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend rdrDayEndOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      7
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayStartOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      8
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      9
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      10
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      11
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      12
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      13
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend rdrDayEndOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      14
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayStartOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      15
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      16
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      17
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      18
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      19
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      20
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend rdrDayEndOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      21
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayStartOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      22
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      23
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      24
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      25
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      26
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      27
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayWeekend rdrDayEndOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      28
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayStartOfWeek"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      29
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      30
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayEndOfMonth"
                  style="color: rgb(61, 145, 255);"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      31
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayPassive"
                  style="color: rgb(61, 145, 255);"
                  tabindex="-1"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      1
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayPassive"
                  style="color: rgb(61, 145, 255);"
                  tabindex="-1"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      2
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayPassive rdrDayWeekend"
                  style="color: rgb(61, 145, 255);"
                  tabindex="-1"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      3
                    </span>
                  </span>
                </button>
                <button
                  class="rdrDay rdrDayPassive rdrDayWeekend rdrDayEndOfWeek"
                  style="color: rgb(61, 145, 255);"
                  tabindex="-1"
                  type="button"
                >
                  <span
                    class="rdrDayNumber"
                  >
                    <span>
                      4
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
