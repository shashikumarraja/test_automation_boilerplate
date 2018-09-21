ASNR API TESTS
=============
[![python 2.7](https://img.shields.io/badge/python-2.7-brightgreen.svg)](https://www.python.org/)
[![pytest 3.6.4](https://img.shields.io/badge/pytest-3.6.4-green.svg)](https://docs.pytest.org/en/latest/)
[![allure_pytest 2.5.0](https://img.shields.io/badge/allure_pytest-2.5.0-yellow.svg)](https://github.com/allure-framework/allure-python)
[![pytest_html 1.19.0](https://img.shields.io/badge/pytest_html-1.19.0-yellowgreen.svg)](https://github.com/pytest-dev/pytest-html)
[![xdist 1.22.5](https://img.shields.io/badge/xdist-1.22.5-orange.svg)](https://pypi.org/project/pytest-xdist/)

A boilerplate project to get started with API automation using pytest in Python with best practices.

The [pytest](https://docs.pytest.org/en/latest/) framework makes it easy to write small tests, yet
scales to support complex functional testing for applications and libraries.

An example of a simple test:
```python
# content of test_sample.py
def inc(x):
    return x + 1
#make sure the test function's name starts with 'test_'
def test_answer():
    assert inc(3) == 5
```

To execute it::

    $ pytest
    ============================= test session starts =============================
    collected 1 items

    test_sample.py F

    ================================== FAILURES ===================================
    _________________________________ test_answer _________________________________

        def test_answer():
    >       assert inc(3) == 5
    E       assert 4 == 5
    E        +  where 4 = inc(3)

    test_sample.py:5: AssertionError
    ========================== 1 failed in 0.04 seconds ===========================

How to Run the project?
=====
1. Clone/download this repo

2. Install all the dependencies using-
```shell
pip install -r requirements.txt
```
3. Install allure-cli

    a. Download the latest version as zip archive from [bintray](https://bintray.com/qameta/generic/allure2).

    b. Unpack the archive to allure-commandline directory.

    c. Navigate to bin directory.

    d. Use allure.bat for Windows or allure for other Unix platforms.

    e. Add allure to system PATH.
    ```shell
    export PATH=$PATH:/usr/local/bin:/usr/local/bin/allure-commandline/allure-2.7.0/bin/
    ```
    f. Check allure version 
    ```shell
    allure --version
    ```
4. Steps to prepare the test data
```shell
client=english raw_data=path_to_data.json python prepare_test_data.py
```
5. Steps to run the test-
```python
#to include print statements and live log
pytest test.py -s

#to run test along with html report(single html file only)
pytest test.py --html=report.html --self-contained-html

#to run test along with html report(separate css file)
pytest test.py --html=report.html

#to run test with allure report
py.test --alluredir=allure_result_folder test.py

#to view allure report after run
allure serve allure_result_folder
```
6. Steps to host allure report on server using nginx

    a. Install nginx on the server if not already installed
    ```shell
    sudo apt-get update
    sudo apt-get install nginx
    ```
    b. Create a config file `allure.com` in /etc/nginx/sites-available/
    ```shell
    server {
    listen 81 default_server;
    root /home/user/api_test/report/Allure;
    index index.html;
    location /api-report {
        alias /home/user/api_test/report/Allure;
        index index.html;
    }
    }
    ```
    c. Now that the file is created, we’ll add it to the sites-enabled folder to tell NGINX to enable it. The syntax is as follows:
    ```shell
    ln -s <SOURCE_FILE> <DESTINATION_FILE>
    ```
    ```shell
    ln -s /etc/nginx/sites-available/allure.com /etc/nginx/sites-enabled/allure.com
    ```
    d. Now restart the nginx
    ```shell
    sudo /etc/init.d/nginx restart
    ```
    No error should come while restarting if everything is fine.
    
    e. To serve the lastest report after a test is run-
    ```shell
    allure generate --clean --output destination_result_folder source_result_folder
    ```
    ```shell
     allure generate --clean --output report/api_test/Allure/ report/api_test/
    ```
To fix liniting errors the project uses [autopep8](https://github.com/hhatto/autopep8).

```shell
//To modify a file in place (with aggressive level 2):

$ autopep8 --in-place --aggressive --aggressive <filename>
```
