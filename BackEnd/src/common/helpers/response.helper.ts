export class ResponseHelper {
  static success<T>(data: T, message: string = 'Success'): { data: T; message: string } {
    return {
      data,
      message,
    };
  }

  static error(message: string, statusCode: number): { message: string; statusCode: number } {
    return {
      message,
      statusCode,
    };
  }

  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): {
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  } {
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
