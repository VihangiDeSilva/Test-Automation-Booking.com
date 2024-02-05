class PG_Main {
  async getCurrentWindowId() {
    return await browser.getWindowHandle();
  }

  async getAllWindowIds() {
    return await browser.getWindowHandles();
  }

  async waitUntilWindowOpen(timeout = 100000) {
    // Wait for the new window to open
    await browser.waitUntil(
      async () => {
        const allWindowIds = await this.getAllWindowIds();
        return allWindowIds.length > 1; // Assuming there are two windows now
      },
      {
        timeout,
        timeoutMsg: "New window did not open within the specified time.",
      }
    );
  }

  async switchNextWindow() {
    await this.waitUntilWindowOpen();
    const currentWindowId = await this.getCurrentWindowId();
    let windowHandles = await this.getAllWindowIds();
    windowHandles = windowHandles.filter(
      (windowHandle) => windowHandle !== currentWindowId
    );
    await browser.switchToWindow(windowHandles[0]);
  }
}

export default new PG_Main();
