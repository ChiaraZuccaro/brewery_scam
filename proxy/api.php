<?php
header("Access-Control-Allow-Origin: *"); // Permette richieste da qualsiasi origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Metodi permessi
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Header permessi

require_once 'config.php';
require_once 'utils.php';

$response = null;
$result = null;
$error = true;

$request_uri = trim($_SERVER['REQUEST_URI'], '/');
$segments = explode('/', $request_uri);

// url example 'http://domain.com/api/action?query'
$queryArray = explode('?', $segments[1]);

$action = $queryArray[0] ?? null;
$query = $queryArray[1] ?? null;

switch ($action) {
  case 'list':
    $response = getDataAfterValidity($query);
    break;
  case 'detail':
    break;
  default:
    $response = array(
      'response' => array(
        'message' => 'Action not valid.'
      ),
      'code' => 100,
      'error' => $error
    );
  break;
}


function getDataAfterValidity(&$query) {
  global $response;
  global $result;

  $error_messages = [];
  // both missing
  if (!$query) {
    $errors[] = "Query params wrong, page and limit missing";
  } else {
    // check if one is missing
    $page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : null;
    $limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? (int)$_GET['limit'] : null;

    if ($page === null) {
      $errors[] = "Page param missing or invalid";
    } elseif ($page < MIN_PAGE || $page > MAX_PAGE) {
      $errors[] = "Page not valid, value min => " . MIN_PAGE . ", value max => " . MAX_PAGE;
    }

    if ($limit === null) {
      $errors[] = "Limit param missing or invalid";
    } elseif ($limit < MIN_LIMIT || $limit > MAX_LIMIT) {
      $errors[] = "Limit not valid, value min => " . MIN_LIMIT . ", value max => " . MAX_LIMIT;
    }
  }

  $message = empty($errors) ? "Success" : implode(". ", $errors) . ".";
  $code = empty($errors) ? 200 : 105;

  if($code === 200) {
    $result = getData($page, $limit);
  }
  
  return [
    "response" => [ "message" => $message, 'result' => $result ],
    "code" => $code, "error" => !empty($errors)
  ];
}

function getData($page, $limit) {
  $params = [ 'page' => $page, 'per_page' => $limit ];
  $query_params = http_build_query($params);
  
  $url = BEERS_BASE_URL . '?' . $query_params;

  $respUrl = file_get_contents($url);
  $data = json_decode($respUrl);

  return $data ?? null;
}


echo json_encode($response);


?>