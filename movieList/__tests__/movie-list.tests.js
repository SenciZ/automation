const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach( async()=>{
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll( async()=>{
    await driver.quit()
})



test('Check title of page', async()=>{
    const pageTitle = await driver.findElement(By.xpath('//h1')).getText()
    expect(pageTitle).toEqual('Movie List')
    await driver.sleep(2000)
})

test('Check if add button exists', async()=>{
    const addButton = await driver.findElement(By.xpath('//button[contains(text(), "Add")]')).getText()
    expect(addButton).toEqual('Add')
    await driver.sleep(2000)
})

test('Check if crossing out movie works', async()=>{
    const newMovie = "Delta Force"
    await driver.findElement(By.css('input')).sendKeys(newMovie)
    await driver.findElement(By.xpath('//button[contains(text(), "Add")]')).click()
    await driver.findElement(By.xpath('//span[contains(text(), "Delta Force")]')).click()
    const checkedMovie = await driver.findElement(By.xpath('//span[@class="checked"]'))
    expect(checkedMovie).toBeTruthy();
await driver.sleep(2000)
})