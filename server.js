import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());


app.get('/bfhl', (req, res) => {
    return res.status(200).json({
        operation_code: 1
    });
});


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        const user_id = "mahesh_kunchala_15042003";
        const email = "mahesh_kunchala@srmap.edu.in";
        const roll_number = "AP21110011635";

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id,
                email,
                roll_number,
                numbers: [],
                alphabets: [],
                highest_alphabet: []
            });
        }

        const numbers = [];
        const alphabets = [];

        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string' && item.length === 1 && /[a-zA-Z]/.test(item)) {
                alphabets.push(item);
            }
        });

        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0]] : [];

        res.status(200).json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});