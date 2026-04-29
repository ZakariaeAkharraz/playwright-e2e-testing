/**
 * Sends automated test results to a Squash TM iteration.
 * * @param iterationId - The ID of the target iteration in Squash TM
 * @param results - An array of results mapping references to statuses
 * @param config - Connection configuration
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
dotenv.config();

type TestResult = {
  reference: string;
  status: string;
  duration?: number;
  failure_details?: string[]
}
export async function sendResultsToSquash(
  iterationId: number,
  results: Array<TestResult>,
  baseUrl: string
) {
  const url = `${baseUrl}import/results/${iterationId}`;

  const payload = {
    tests: results.map(res => ({
      reference: res.reference,
      status: res.status, // Must be SUCCESS, FAILURE, BLOCKED, etc.
      duration: res.duration || 0,
      failure_details: res.failure_details || []
    }))
  };

  try {
    console.log("token: ", process.env.SQUASH_QA_TOKEN)
    const response = await fetch(url, {
      method: 'POST',
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SQUASH_QA_TOKEN}`
      },
      body: JSON.stringify(payload)

    });

    if (response.status === 204) {
      console.log(`✅ Successfully imported ${results.length} results to iteration ${iterationId}.`);
    } else {
      const errorBody = await response.text();
      console.error(`❌ Squash TM Import Failed (${response.status}):`, errorBody);
    }
  } catch (error) {
    console.error('❌ Connection error to Squash TM API:', error);
  }
}