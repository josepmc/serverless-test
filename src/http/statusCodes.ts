export enum StatusCode {
    /**
     * The request succeeded. The result meaning of "success" depends on the HTTP method:
     * GET: The resource has been fetched and transmitted in the message body.
     * HEAD: The representation headers are included in the response without any message body.
     * PUT or POST: The resource describing the result of the action is transmitted in the message body.
     * TRACE: The message body contains the request message as received by the server.
     */
    OK = 200,
    /**
     * The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.
     */
    CREATED = 201,
    /**
     * The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.
     */
    ACCEPTED = 202,
    /**
     * The server could not understand the request due to invalid syntax.
     */
    BAD_REQUEST = 400,
    /**
     * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
     */
    UNAUTHORIZED = 401,
    /**
     * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
     */
    FORBIDDEN = 403,
    /**
     * The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
     */
    NOT_FOUND = 404,
    /**
     * The server has encountered a situation it does not know how to handle.
     */
    ERROR = 500,
    /**
     * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
     */
    NOT_IMPLEMENTED = 501,
}
