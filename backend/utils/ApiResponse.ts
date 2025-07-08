class ApiResponse {
  success: boolean;
  constructor(
    public status: number,
    public message: string = "Success",
    public data?: any
  ) {
    this.status = status;
    this.message = message;
    this.data = data || null; // Initialize data as null if not provided
    this.success = status >= 200 && status < 400; // Determine success based on status code
  }

  static success(data: any, message: string = "Success") {
    return new ApiResponse(200, message, data);
  }

//   static error(message: string, status: number = 500) {
//     return new ApiResponse(status, message);
//   }
}
