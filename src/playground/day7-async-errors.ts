function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function returnsValue(): Promise<string> {
  return "Merhaba";
}

async function throwsError(): Promise<void> {
  throw new Error("Async function içinde hata oluştu");
}

async function delayedError(): Promise<void> {
  await wait(300);
  throw new Error("Gecikmeli async hata");
}

async function main(): Promise<void> {
  try {
    const value = await returnsValue();
    console.log("Value:", value);

    await throwsError();

    console.log("Bu satır çalışmaz");
  } catch (error) {
    console.log("İlk hata yakalandı:", error);
  }

  try {
    await delayedError();
  } catch (error) {
    console.log("İkinci hata yakalandı:", error);
  }
}

main().catch((error) => {
  console.error("Main catch:", error);
});