export async function playNotificationSound() {
  try {
    //try catch構文の活用
    const audio = new Audio('/notification.mp3');
    audio.volume = 0.3;

    await audio.play();

    //Promiseは処理に時間がかかるものに使用するらしい
    //onendedは終わった時に実行するk
    return new Promise<void>((resolve) => {
      audio.onended = () => {
        resolve();
      };
    });

  } catch (error) {
    console.error('failed play sound effect!', error);

  }
}
