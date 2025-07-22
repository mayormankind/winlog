import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, title, description, impact, proof_urls } = body;

    if (!user_id || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("brag_entries")
      .insert([{ user_id, title, description, impact, proof_urls }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(request: Request) {
  // Your code to fetch brag entries
}

export async function PUT(request: Request) {
  // Your code to update brag entries
}

export async function DELETE(request: Request) {
  // Your code to delete brag entries
  return NextResponse.json(
    { message: "Delete operation not implemented" },
    { status: 501 }
  );
}
