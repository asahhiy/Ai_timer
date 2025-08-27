//API route call and make refresh sugettions

export async function generateRefreshSuggetion(): Promise<string> {
  try {
    //call API
    const response = await fetch('/api/refresh-suggetion')
    const data = await response.json();

    return data.suggetion
  } catch (error) {
    console.error(error);
    return 'エラーが発生しました'
  }
}
