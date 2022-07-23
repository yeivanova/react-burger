import moment from "moment";

export function getDateFormat(orderDateString: string): string {
  let now = moment().utc();
  let orderDate = moment(orderDateString);
  let isToday = orderDate.isSame(now, "day");
  let isYestoday = orderDate.isSame(now.subtract(1, "days"), "day");
  let isTwoDaysAgo = orderDate.isSame(now.subtract(2, "days"), "day");

  let newStr = "";
  let offset = orderDate.utcOffset() / 60;

  if (isToday) {
    newStr = "Сегодня";
  } else if (isYestoday) {
    newStr = "Вчера";
  } else if (isTwoDaysAgo) {
    newStr = "2 дня назад";
  } else {
    newStr = orderDate.format("DD.MM.YYYY");
  }

  newStr = `${newStr}, ${orderDate.format("HH:mm")}\xA0i\u2011GMT${
    offset > 0 ? "+" : "-"
  }${offset}`;
  return newStr;
}

export function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: any) => Promise.reject(err));
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: any | null) {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
