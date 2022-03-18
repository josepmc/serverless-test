@ci @login
Feature: Authentication

  Scenario: Login with valid credentials
    When I send a login request with "bob" and "P@55w0rd"
    Then I should receive a 200 response from the server

  Scenario Outline: Login with invalid credentials
    When I send a login request with "<username>" and "<password>"
    Then I should receive a 401 response from the server

    Examples:
      | username     | password     |
      | bob          |              |
      |              | P@55w0rd     |
      | bob          | test         |
      | bob          | test         |
      # depending on the underlying db, this might be worth
      | 'OR 1 = 1;-- | 'OR 1 = 1;-- |
# The current method of sending the credentials (via header) doesn't support non-ASCII payloads