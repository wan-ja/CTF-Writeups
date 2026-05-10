const puppeteer = require('puppeteer-core');
const express = require('express');
const app = express();

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const adminId = 'admin';
const adminPassword = '{{**REDACTED**}}';

const setupDialogHandler = page => {
	page.on('dialog', async dialog => {
		await dialog.accept();
	});
};

const loginAsAdmin = async page => {
	await page.goto('http://nginx:8080/login.php', {
		waitUntil: 'networkidle2'
	});

	await page.type('input[name="username"]', adminId);
	await page.type('input[name="password"]', adminPassword);

	await Promise.all([
		page.click('button[type="submit"]'),
		page.waitForNavigation({ waitUntil: 'networkidle2' })
	]);
};

const logout = async page => {
	await page.goto('http://nginx:8080/logout.php', {
		waitUntil: 'networkidle2'
	});
};

const visit = async path => {
	let browser;
	try {
		browser = await puppeteer.launch({
			headless: 'new',
			executablePath: '/usr/bin/google-chrome',
			args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
		});

		const page = await browser.newPage();

		setupDialogHandler(page);

		await loginAsAdmin(page);
		await sleep(400);

		await page.goto(`http://nginx:8080/${path}`, {
			timeout: 500
		});

		await logout(page);
		await sleep(400);

		await page.close();
		await browser.close();
		browser = null;
	} catch (err) {
		console.log('error', err);
	} finally {
		if (browser) await browser.close();
	}
};

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('bot');
});

app.get('/bot', (req, res) => {
	res.send(`
	<form action="/bot" method="POST">
		<h2>ADMIN Bot<h2>
		<pre>http://nginx:8080/<input id="path" name="path" required></pre>
        <button type="submit">Submit</button>
    </form>`);
});

app.post('/bot', (req, res) => {
	try {
		visit(req.body.path);
		res.send('success');
	} catch (error) {
		res.send('something wrong....');
	}
});

app.listen(8000, () => {
	console.log('port 8000');
});
