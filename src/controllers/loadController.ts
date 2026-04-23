import { Request, Response } from 'express';
import Load, { ILoad } from '../models/Load';

/**
 * Get all PENDING loads
 * GET /api/loads
 */
export const getPendingLoads = async (req: Request, res: Response): Promise<void> => {
  try {
    const loads = await Load.find({ status: 'PENDING' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: loads,
    });
  } catch (error) {
    console.error('Error fetching pending loads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching loads',
    });
  }
};

/**
 * Accept a specific load
 * PATCH /api/loads/:id/accept
 */
export const acceptLoad = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    if (!driverId) {
      res.status(400).json({
        success: false,
        message: 'driverId is required to accept a load',
      });
      return;
    }

    // Atomic operation to prevent race conditions
    const updatedLoad = await Load.findOneAndUpdate(
      { _id: id, status: 'PENDING' },
      { 
        $set: { 
          status: 'ACCEPTED', 
          driverId: driverId 
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedLoad) {
      const existingLoad = await Load.findById(id);
      
      if (!existingLoad) {
        res.status(404).json({
          success: false,
          message: 'Load not found',
        });
        return;
      }

      if (existingLoad.status === 'ACCEPTED') {
        res.status(409).json({
          success: false,
          message: 'Conflict: Load has already been accepted by another driver',
        });
        return;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Load successfully accepted',
      data: updatedLoad,
    });

  } catch (error: any) {
    console.error('Error accepting load:', error);
    
    if (error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'Invalid load ID format',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error while accepting load',
    });
  }
};
