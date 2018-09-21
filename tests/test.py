import requests
import pytest
import json
import allure
import logging

logger = logging.getLogger(__name__)

def get_test_data():
    return [2,3,4,5,6,'7']

@pytest.mark.parametrize("test_data", get_test_data())
def test_is_int(test_data):
    with allure.step("Value is integer"):
        assert type(test_data) is int