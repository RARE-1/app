#!/usr/bin/env python3
"""
Backend API Testing Script for Brothers Travel India
Tests the API endpoints as specified in test_result.md
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://brothers-travel.preview.emergentagent.com/api"

def log_test_result(test_name, success, details):
    """Log test results with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"[{timestamp}] {status} - {test_name}")
    if details:
        print(f"    Details: {details}")
    print()

def test_api_root():
    """Test GET /api - should return ok:true and service name"""
    print("=" * 60)
    print("Testing GET /api (root endpoint)")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if ok is true
            if data.get('ok') == True:
                # Check if service name is present
                if 'service' in data and data['service']:
                    log_test_result("GET /api", True, f"Service: {data['service']}")
                    return True
                else:
                    log_test_result("GET /api", False, "Missing or empty service name")
                    return False
            else:
                log_test_result("GET /api", False, f"ok field is not true: {data.get('ok')}")
                return False
        else:
            log_test_result("GET /api", False, f"Expected 200, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        log_test_result("GET /api", False, f"Request failed: {str(e)}")
        return False
    except json.JSONDecodeError as e:
        log_test_result("GET /api", False, f"Invalid JSON response: {str(e)}")
        return False

def test_api_health():
    """Test GET /api/health - should return ok:true"""
    print("=" * 60)
    print("Testing GET /api/health")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if ok is true
            if data.get('ok') == True:
                log_test_result("GET /api/health", True, "Health check passed")
                return True
            else:
                log_test_result("GET /api/health", False, f"ok field is not true: {data.get('ok')}")
                return False
        else:
            log_test_result("GET /api/health", False, f"Expected 200, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        log_test_result("GET /api/health", False, f"Request failed: {str(e)}")
        return False
    except json.JSONDecodeError as e:
        log_test_result("GET /api/health", False, f"Invalid JSON response: {str(e)}")
        return False

def test_api_enquiries():
    """Test POST /api/enquiries - should return status 501 with message about not connected"""
    print("=" * 60)
    print("Testing POST /api/enquiries")
    print("=" * 60)
    
    # Test data for enquiry
    test_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9876543210",
        "message": "Interested in Kashmir tour package"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/enquiries", 
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 501:
            data = response.json()
            
            # Check if message mentions not connected
            message = data.get('message', '')
            if 'not connected' in message.lower():
                log_test_result("POST /api/enquiries", True, f"Correct 501 response: {message}")
                return True
            else:
                log_test_result("POST /api/enquiries", False, f"Message doesn't mention 'not connected': {message}")
                return False
        else:
            log_test_result("POST /api/enquiries", False, f"Expected 501, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        log_test_result("POST /api/enquiries", False, f"Request failed: {str(e)}")
        return False
    except json.JSONDecodeError as e:
        log_test_result("POST /api/enquiries", False, f"Invalid JSON response: {str(e)}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for Brothers Travel India")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Track test results
    results = []
    
    # Run tests
    results.append(("GET /api", test_api_root()))
    results.append(("GET /api/health", test_api_health()))
    results.append(("POST /api/enquiries", test_api_enquiries()))
    
    # Summary
    print("=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print()
    print(f"Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests PASSED!")
        return 0
    else:
        print("⚠️  Some backend API tests FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())