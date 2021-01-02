import express from 'express'

const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
	    res.json({
			        success: true,
			    });
});

app.listen(port, () => {
	    console.log(`server is listening at localhost:${port}`);
});
