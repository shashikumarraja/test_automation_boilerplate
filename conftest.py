import pytest
import os
import re
import os.path
import allure
import errno
import json
import requests
from collections import defaultdict
from utils import delete_contents_of_dir, create_dir, connect_to_mongo_db, write_to_collection
# from pymongo import MongoClient 

#set the allure-report directory path before test starts
@pytest.hookimpl(tryfirst=True)
def pytest_configure(config):
    report_path = 'report/'
    if config.option.allure_report_dir is None:
        create_dir(report_path, True)
        config.option.allure_report_dir = report_path

# from _pytest.runner import TestReport
# from _pytest.terminal import TerminalReporter

def pytest_sessionstart(session):
    session.results = dict()


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    result = outcome.get_result()

    if result.when == 'call':
        item.session.results[item] = result

def pytest_sessionfinish(session, exitstatus):
    # Running pytest can result in six different exit codes:
    # Exit code 0:	All tests were collected and passed successfully
    # Exit code 1:	Tests were collected and run but some of the tests failed
    # Exit code 2:	Test execution was interrupted by the user
    # Exit code 3:	Internal error happened while executing tests
    # Exit code 4:	pytest command line usage error
    # Exit code 5:	No tests were collected
    print '\nrun status code:', exitstatus

    passed_amount = sum(1 for result in session.results.values() if result.passed)
    failed_amount = sum(1 for result in session.results.values() if result.failed)
    print 'there are %s passed and %s failed tests'%(passed_amount, failed_amount)
    run_summary = defaultdict(list)

    for i in session.results.values():
        run_summary['summary'].append({'test': i.nodeid, 'status': 'PASSED' if i.passed else 'FAILED', 'description': i.longreprtext})
    db_name = 'api_test'
    collection_name = 'reports'
    conn = connect_to_mongo_db()
    write_to_collection(conn, db_name, collection_name, run_summary)





