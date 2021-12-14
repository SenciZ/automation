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
    await driver.sleep(200)
})

test('Check if add button exists', async()=>{
    const addButton = await driver.findElement(By.xpath('//button[contains(text(), "Add")]')).getText()
    expect(addButton).toEqual('Add')
    await driver.sleep(200)
})

test('Check if crossing out movie works', async()=>{
    const newMovie = "Delta Force"
    await driver.findElement(By.css('input')).sendKeys(newMovie)
    await driver.findElement(By.xpath('//button[contains(text(), "Add")]')).click()
    await driver.findElement(By.xpath('//span[contains(text(), "Delta Force")]')).click()
    const checkedMovie = await driver.findElement(By.xpath('//span[@class="checked"]'))
    expect(checkedMovie).toBeTruthy();
    await driver.sleep(200)
})

test('Check if delete movie works', async()=>{
    await driver.findElement(By.css('input')).sendKeys('Castaway')
    await driver.findElement(By.xpath('//button[contains(text(), "Add")]')).click()
    await driver.findElement(By.xpath('//button[contains(text(), "x")]')).click()
    const movieList = await driver.findElement(By.css('ul')).getText();
    expect(movieList).toEqual('')
    await driver.sleep(200)
})

test('Check if deleting move brings up notification', async()=>{
    await driver.findElement(By.css('input')).sendKeys('SuperTroopers')
    await driver.findElement(By.xpath('//button[contains(text(), "Add")]')).click()
    await driver.findElement(By.xpath('//button[contains(text(), "x")]')).click()
    const deleteNotification = await driver.findElement(By.css('aside')).getText();
    expect(deleteNotification).toContain('deleted!')
    await driver.sleep(200)
})
