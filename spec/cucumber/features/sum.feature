@ci @sum
Feature: Sum Action
  Scenario: Can't execute action while unauthorized
    When I send an invalid login request
    And I sum "1" and "2"
    Then I should receive a 401 response from the server

  Scenario Outline: Can sum numerical payloads
    When I send a valid login request
    And I sum "<first value>" and "<second value>"
    Then I should receive a 200 response from the server
    And I should receive "<total value>" as the total of the sum
    Examples:
      | first value      | second value | total value        |
      | 1                | 1            | 2                  |
      | 0                | 0            | 0                  |
      | 0.00005          | 0.00005      | 0.0001             |
      # ***The following examples will fail because of the sum method***
      # returns null (as non-numerical) even though ',' is used in certain locales as a decimal separator
      | 0,00005          | 0,00005      | 0,0001             |
      # unsafe integers: will fail as it doesn't use BigNumber
      | MAX_SAFE_INTEGER | 2            | MAX_SAFE_INTEGER+2 |
      # hex notation: will fail as it doesn't respect the notation format
      | 0x1              | 0x1          | 0x2                |
  # other notations could go here (exponential, baseX, etc as it's not defined in the spec)

  Scenario Outline: Can't sum non-numerical payloads
    When I send a valid login request
    And I sum "<first value>" and "<second value>"
    Then I should receive a 200 response from the server
    And I should receive an error as the total of the sum

    Examples:
      | first value  | second value |
      |              |              |
      | 1            |              |
      |              | 1            |
      | bob          | test         |
      | 1            | @@@@         |
      | 'OR 1 = 1;-- | 'OR 1 = 1;-- |

  Scenario Outline: Fails gracefully on no payload
    When I send a valid login request
    And I sum with a custom payload "<first value>" and "<second value>"
    Then I should receive a 200 response from the server
    And I should receive an error as the total of the sum

    Examples:
      | first value | second value |
      | false       | 1            |
      | 1           | false        |
      | false       | false        |