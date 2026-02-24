import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {

let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/products")



return NextResponse.json(data)

}