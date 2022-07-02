
export const getBuilder = (url:string) => ({
  url,
  method: "GET",
});

export const postBuilder = (url:string, body:any) => ({
  url,
  method: "POST",
  body,
});

export const patchBuilder = (url:string, body:any) => ({
  url,
  method: "PATCH",
  body,
});

export const deleteBuilder = (url:string) => ({
  url,
  method: "DELETE",
});
