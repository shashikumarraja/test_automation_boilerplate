import test from 'ava';

const request = require('supertest');
const app = require('../app.js');

test('check status', async t => {
	const response = await request(app)
		.get('/report');
	t.is(response.status, 200);
});

test('Create report summary', async t => {
	const body = {
        "summary":[ { "test" : "tests/test.py::test_is_int[7]", "status" : "FAILED", "description" : "test_data = '7'\n\n    @pytest.mark.parametrize(\"test_data\", get_test_data())\n    def test_is_int(test_data):\n        with allure.step(\"Value is integer\"):\n>           assert type(test_data) is int\nE           AssertionError: assert <type 'str'> is int\nE            +  where <type 'str'> = type('7')\n\ntests/test.py:15: AssertionError" }, { "test" : "tests/test.py::test_is_int[6]", "status" : "PASSED", "description" : "" }, { "test" : "tests/test.py::test_is_int[5]", "status" : "PASSED", "description" : "" }, { "test" : "tests/test.py::test_is_int[4]", "status" : "PASSED", "description" : "" }, { "test" : "tests/test.py::test_is_int[3]", "status" : "PASSED", "description" : "" }, { "test" : "tests/test.py::test_is_int[2]", "status" : "PASSED", "description" : "" } ]
     }
	const response = await request(app)
		.post('/report/create')
		.send(body);

    t.is(response.status, 200);
	t.is(response.body.message, 'Report entry Created successfully');
});

test('Create report without summary', async t => {
	const response = await request(app)
		.post('/report/create')
		.send({});

	t.is(response.status, 400);
	t.is(response.body.message, 'summary is missing');
});
