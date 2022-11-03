import { getApiRoot } from "./getApiRoot";

export class BFF {
  static async Send(relativeUrl, data, method) {
    const baseUrl = getApiRoot();
    const response = await fetch(`${baseUrl}${relativeUrl}`, {
      method: method,
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.text();
    }
  }

  static async Get(relativeUrl) {
    return this.Send(relativeUrl, null, "GET");
  }

  static async Get(relativeUrl, parameterList) {
    const paramString = `?${Object.entries(parameterList)
      .map((x) => `${x[0]}=${x[1]}`)
      .join("&")}`;
    return this.Get(`${relativeUrl}${paramString}`);
  }

  static async Post(relativeUrl, data) {
    return this.Send(relativeUrl, data, "POST");
  }

  static async Put(relativeUrl, data) {
    return this.Send(relativeUrl, data, "PUT");
  }

  static async Delete(relativeUrl, data) {
    return this.Send(relativeUrl, data, "DELETE");
  }
}
