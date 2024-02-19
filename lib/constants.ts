export type Bank = {
  name: string;
  id: number;
  logoUrl: string;
};

// This should live in a .env file
export const BASE_URL = "https://data.kurzy.cz";

// List of banks
// Source: https://www.kurzy.cz/html-kody/json/kurzy-bank.htm
export const BANKS: Bank[] = [
  {
    id: 58,
    name: "Air Bank",
    logoUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAt1BMVEUAAAD///+Mxj+KiopdXV2jo6OpqalRUVHj4+PIyMiTk5N0dHR6enrz8/OOyUCGhoa/v7+xsbHPz8/5+fmSzkJWeSfp6emtra1CQkLX19dzojRnZ2cwMDCAgIAqKirV1dUiIiITExM6OjpZWVkUHAlqljAfLA5ISEg3ThmZmZl/tDlCXh5IZiA+WBwzSBdiYmIYIgtZfihfhystQBR4qjYLDwWFvDwcKA0mNhFvnDIQFwdQcSRljy4qfdonAAAGiElEQVR4nO2aaVviShCFE1lkCxJAFsMSwJFhNkfHcZzl//+ua7qregkhECUG73PeT/SSUCfV6e7qiuMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA98Zk1SpdNM8XRduRE+VOzyUG1ZmqHo27go4oycJ8Ki6odsdd1e/ySnL/xmYfzLLmWnS44ZxVixIVKo4TeOIXd7vutwX9bwUYfwiBG6c3kS2ssCZKUpZbdRrUi2/woX0W0b4qxPz9LLcEuq4nm2yFA1K4cm2FN30h8Kx/U4yAvYxZ1jAIqvy7IppshTSWh4OYwity4e+CBOxjwqJGUSm0rLcVzsm/rq3wB7vwuhgBe5mSvb4sbqi4jgq2wnp8LMsrHsiF/wox/wB4YE5lcW0WdyocVKfBbVPUfiQXtn8WY/9+womElnoeppuosEvh1Lj+E7nw7q0NfzHmVLNDYcvo/plceFaErZlYl/x6zXtmv8KBed0jTTN/C7A5AxNfbdrc/QqHxpV/34cLh3F56QpLxqWkr/+lCLsPppYgME2h8RpeShe2PxVi+KFogV6306lnUsgu/FqI5QdSYX1Dud2mUjX6vU/hffs9uJAFrmUxzKDwJ+/XTjVqEvCmrUHlZQaF/8iFD29vdgZ8MjukcpPHbFRIV/iLXfiUq4XhSDLb3zURChhcPp/xD1f424iaylbPo0LxNocGmenGzHYPVvjELvzl5KqwZL43L4B9RlE9u1Q+sVSFVtR0wgpbLMlrzSYtDt8PUPiNo6Y/UemEFaphGUOct6Up5KhJniCessKGrcyl5aMetaUo/GpvuU9ZoZprJKOVYWqKwkfpwv6lvMlJK1STTWTgzBnRz6jFPhHmRxFF+F9iUdPBCker8mqd2iM8P1+a5SModCZVcaLo1YPnwqJ0EVGKFsgZ/ZZvXkCl6FCOA1+OmkyF4aZbG9S6m2X8f859dRBZb+rqqS/oRP8Y0EAZ681vXOHKJ0pOjlDg237kCkNhR42I8bl5zdqO0nrqsIfD04kzMboMeA8TV6h6hHkq5Kjpc1zheOG5BsbImrpx6tTC0c1oZLfPEhWqA+z0sf5K7raiJuVDz7ZSJXlutwSqRlYYxI5SBkkK+TzXvchToNMmF37cUrhFhToo5f60odywsoz24tdebCvk41z96HIhIWoyFXr1jrECycHE+a2eGHoXVJLj1FyRvbnxKo63FfJTyGFVMvjOLvyRpLAXiArfNpOLNLZo+9uLKRwIp+qpakshL8m9fFPVSelCrZBSj/oATziRnUorSMMsKoV8EKuOnmcxhex715qkj85TUrpQKdyoKh5Qcg9/Kwjo2fN+f2UpXNGVM+vhaIUq05nvLKPShR/MSqVQV6kJJOEe3F2MaFaocsoOT6q3UUEr5P1CvrOMShe2rXShWg91lUpMhrpu2dp0uvNxjW21FM5Vt57ZzAo3/C7nO8vsSheyQvOogRWWqTzzt9YDsXdjhdo1ntnMCnmS9XL+IEalC+1qVlgx6tgkemuMDb7C8uEehczcyRcKfPuxdCEr3Bh1vLCLg8pwy39ZfaieUL7zzK50YZIP+cxnYxr9zGA85/cwi8KK2rDlOkx3pQtZoRnEmT5US5w/MrtnUVhV1V0nPzhd+BhvYJPrRh2/h89hEkcNPVrxm6aEgxXyVa4RXB6bnelCVmgufmzPSm9wbqmJNyetTAp1miw3gXc704VqxR+pKhXtLbRp3MYBU0aF6pa5rfnbUdOWQv3f7LfIrb2Yh/kVzahQb8qDfATe78416Z03r++cphP5Ad6k0CyoNpjTjAoXfGHPyYNrdmFCutCID+XjXajj82hy4VFKIlRbVoU6xH9pniaVtI8szQh43AhaegMjZlc1ujrPwVVTr40XWRXqdTWHAOomLV248xTDDaPm1Y7GUmaF6mPYpJDllaR+ZMkKuyp5RdCUMLZrPfqarpFZob7Ta06IE1GB7/c0hXXH3n/ynBdatb2Q3ic/u0L9we/IOS4P8mPufvJHlmVtpfEJ41xnpmc6cefWFjxjiP3XRl9L8NTbMhXyp1jqFT/yOL2+uxTc/UlsXlYrEdXIZ2t5eF8b2g+51ZWGzyPPrGV/sSkv07X6IH9TkTXiFGNl3DpiIcuVyjDf05oXsViOJvt7AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP8f/wE1Hl7wTouK2AAAAABJRU5ErkJggg==",
  },
  {
    id: 6,
    name: "Česká národní banka",
    logoUrl:
      "https://www.cnb.cz/export/system/modules/org.opencms.apollo/resources/img/favicon_120.png",
  },
  {
    id: 2,
    name: "Česká spořitelna",
    logoUrl:
      "https://cdn0.erstegroup.com/content/dam/cz/csas/www_csas_cz/obrazky/ikony/favicon.ico",
  },
  {
    id: 1,
    name: "ČSOB",
    logoUrl:
      "https://www.csob.cz/o/pui-theme-pw-ng/images/pui/csob/favicons/favicon-32x32.png",
  },
  {
    id: 56,
    name: "Fio banka",
    logoUrl: "https://www.fio.cz/gfx/favicons/favicon-32x32.png",
  },
  {
    id: 4,
    name: "Komerční banka",
    logoUrl: "https://www.kb.cz/img/favicon/favicon-32x32.png",
  },
  {
    id: 49,
    name: "Max banka",
    logoUrl: "https://www.maxbanka.eu/files/maxbanka-favicon3.png",
  },
  {
    id: 46,
    name: "mBank",
    logoUrl:
      "https://www.mbank.cz/favicon.ico?9075b2fac116a506b6cecbf07ed1ef50",
  },
  {
    id: 5,
    name: "MONETA",
    logoUrl: "https://www.moneta.cz/o/nwp-theme/images/favicon.ico",
  },
  {
    id: 35,
    name: "Oberbank AG",
    logoUrl: "https://www.oberbank.cz/o/oberbank-theme/images/favicon.ico",
  },
  {
    id: 51,
    name: "Poštovní spořitelna",
    logoUrl:
      "https://www.csob.cz/o/pui-theme-pw-ng/images/pui/csob/favicons/favicon-32x32.png",
  },
  { id: 16, name: "Raiffeisenbank", logoUrl: "https://www.rb.cz/favicon.ico" },
  {
    id: 123,
    name: "Trinity Bank",
    logoUrl: "https://www.trinitybank.cz/favicon-96x96.png",
  },
  {
    id: 10,
    name: "UniCredit Bank",
    logoUrl:
      "https://www.unicreditbank.cz/etc/designs/cee2020-pws-cz/favicon.ico",
  },
];
