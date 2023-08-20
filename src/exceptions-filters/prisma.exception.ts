import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Catch(PrismaClientKnownRequestError)

export class PrismaException implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if(exception.code === 'P2025'){
            return response.status(404).json({
                statusCode: 404,
                message: exception.message,
            })
        }
        return response.status(500).json({
            statusCode: 500,
            message: exception.message,
        })
    }
}
